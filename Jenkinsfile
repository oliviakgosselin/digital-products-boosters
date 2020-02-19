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
      stage('Deploy'){
        script{
          deployToS3('./bin/**')
        }
      }
    }
}

def buildAllSlides(){
  sh '''
    for FILE in $(find ./decks -path ./decks/node_modules -prune -false -o -name "*.mdx"); do
      BOOSTER_NAME=$(echo $FILE | awk -F '[./]' '{print $4}')
      MEETING_NUM=$(echo $FILE | awk -F '[./]' '{print $5}')
      OUTPUTDIR="${BOOSTER_NAME}-${MEETING_NUM}"
      yarn --cwd ./decks mdx-deck build "./${BOOSTER_NAME}/${MEETING_NUM}.mdx" -d "./dist/${OUTPUTDIR}" --basepath="/${OUTPUTDIR}"
    done
    cp -r ./decks/dist/ ./bin
  '''
}

def deployToS3(String file){
    retry(3) {
    try {
      timeout(time: 5, unit: 'MINUTES') {
        aws.s3Upload(
          bucket: 'digitalproducts-boosters',
          files: file,
          profile: 'intrepid-devops', 
          useServerSideEncryption: true,
          uploadFromSlave: true
        )
      }
    } catch (e) {
      logger(level: 'warning', message: 'S3 Booster deployment failed.')
      logger(level: 'warning', message: e.toString())
    }
  }
}
