pipeline {
    agent any
    
    stages {
        stage('Setup parameters') {
            steps {
                script {
                    properties([
                        parameters([
                            booleanParam(
                                defaultValue: false,
                                description: 'Is a test',
                                name: 'PRINTENVS'
                            )
                        ])
                    ])
                }
            }
        }
        
        stage('Build') {
            when {
                expression { 
                    return params.PRINTENVS
                }
            }
            steps {
                echo env.BRANCH_NAME
                sh 'printenv'
            }
        }
    }
}
