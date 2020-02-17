pipeline{
    agent { label 'node-810' }
    options {
    timeout(time: 1, unit: 'HOURS')
    }
    stages{
      stage('Clean and Prepare'){
        steps{
          sh '''
            rm -rf ./bin
            mkdir ./bin
          '''
        }
      }
      stage('Install and Build'){
        parallel{
          stage('Meeting Decks'){
            steps{
              sh 'yarn --cwd ./decks install'
              buildAllSlides()
            }
          }
          stage('Website'){
            steps{
              sh '''
                yarn --cwd ./website install
                yarn --cwd ./website react-scripts build
                cp -r ./website/build/ ./bin
              '''
            }
          }
        }
      }
      stage('Deploy'){}
    }
}

def buildAllSlides(){
  sh '''
    for FILE in $(find ./decks -path ./decks/node_modules -prune -false -o -name "*.mdx"); do
      BOOSTER_NAME=$(echo $file | awk -F '[./]' '{print $4}')
      MEETING_NUM=$(echo $file | awk -F '[./]' '{print $5}')
      OUTPUTDIR="${BOOSTER_NAME}-${MEETING_NUM}"
      yarn --cwd ./decks mdx-deck build "./${BOOSTER_NAME}/${MEETING_NUM}.mdx" -d "./dist/${OUTPUTDIR}" --basepath="/${OUTPUTDIR}"
    done
    cp -r ./decks/dist/ ./bin
  '''
}
