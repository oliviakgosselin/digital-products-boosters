pipeline{
    agent { label 'node-810' }
    options {
    timeout(time: 1, unit: 'HOURS')
    }
    stages{
      stage('Install Dependencies'){
        parallel{
          stage('Deck Dependencies'){
            steps{
              sh 'yarn --cwd ./decks install'
            }
          }
          stage('Website Dependencies'){
            steps{
            sh 'yarn --cwd ./website install'
            }
          }
        }
      }
      stage('Build Deck and Website'){
          parallel{ 
          stage('Build Deck'){
            steps{
              buildAllSlides()
            }
          }
          stage('Website Dependencies'){
            steps{
              buildWebsite()
            }
          }
        }
      }
      stage('Deploy'){}
    }
}

def buildAllSlides(){
  sh """
    #!/bin/bash
    rm -r bin
    mkdir bin
    for file in $(find ./decks -path ./decks/node_modules -prune -false -o -name "*.mdx"); do
      fileName=$(echo $file | cut -f 4 -d '/' | cut -f 1 -d '.')
      dir=$(echo $file | cut -f 3 -d '/')
      outputDir="${dir}-${fileName}"
      file=$(echo $file | cut -f 1,3- -d '/')
      yarn --cwd ./decks mdx-deck build $file -d dist/$outputDir --basepath="/${outputDir}"
    done
    cp -r ./decks/dist/ ./bin
    rm -r ./decks/dist
  """
}

def buildWebsite(){
  sh """
    rm -r bin/static
    rm -f bin/* 2>/dev/null
    yarn --cwd ./website react-scripts build
    cp -r ./website/build/ ./bin
    rm -r ./website/build
  """
}