pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('Test stage') {
      parallel {
        stage('Test stage') {
          steps {
            slackSend(channel: '#jenkins', color: '#4d94ff', message: 'BUILD STARTED - ${env.JOB_NAME} - BUILD NUMBER: ${env.BUILD_NUMBER} by ${BUILD_USER} -> COMMENTS: ${params.DEPLOY_COMMENTS} (<${env.BUILD_URL}|View in Jenkins>)', blocks: '_', attachments: '_')
          }
        }

        stage('Test 2') {
          steps {
            sleep 10
          }
        }

        stage('Test 3') {
          steps {
            sleep 20
          }
        }

      }
    }

    stage('Test 2') {
      steps {
        sleep 10
      }
    }

    stage('') {
      steps {
        sleep 25
      }
    }

  }
}