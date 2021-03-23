pipeline {
    agent any
    
    stages {
        stage('Setup parameters') {
            script {
                properties([
                    booleanParam(
                        defaultValue: true,
                        description: 'Is a test',
                        name: 'PRINTENVS'
                    )
                ])
            }
        }
        
        stage('Build') {
            when {
                expression { "${params.PRINTENVS}" == 'true' }
            }
            steps {
                echo env.BRANCH_NAME
                sh 'printenv'
            }
        }
    }
}
