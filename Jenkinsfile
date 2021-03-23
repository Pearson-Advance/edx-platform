pipeline {
    agent {
        node {
            label 'Development'
        }
    }

    stages {
        stage('Setup params') {
            steps {
                script {
                    properties([
                        parameters([
                            string(
                                defaultValue: '', 
                                name: 'EDX_PLATFORM_VERSION',
                                description: 'edx platform version to ',
                                trim: false
                            ),
                            string(
                                defaultValue: 'pearson-release/juniper.master', 
                                name: 'BRANCH_CONFIGURATION',
                                description: 'edx configuration branch',
                                trim: false
                            ),
                            string(
                                defaultValue: 'stage', 
                                name: 'BRANCH_CUSTOMER_DATA',
                                description: 'pearson customer data branch',
                                trim: false
                            ),                           
                            booleanParam(
                                defaultValue: false,
                                description: 'If you made changes in some theme of if your change requires to recompile the theme.',
                                name: 'COMPILE_THEMES'
                            ),
                            booleanParam(
                                defaultValue: true,
                                description: 'If you made changes in edx-platform project or in customer-data project.',
                                name: 'DEPLOY_EDXAPP'
                            ),
                            booleanParam(
                                defaultValue: true,
                                description: 'If you made changes in celery tasks o async tasks and you need update the workers.',
                                name: 'DEPLOY_WORKERS'
                            ),
                            string(
                                defaultValue: '', 
                                name: 'EXTRA_PARAMS',
                                description: 'Set extra params to run the ansible playbook.',
                                trim: false
                            ),                 
                        ])
                    ])
                }
            }
        }

        stage('Notify') {
            steps {
                wrap([$class: 'BuildUser']) {
                    slackSend color: '#4d94ff', message: "BUILD STARTED - ${env.JOB_NAME} - BUILD NUMBER: ${env.BUILD_NUMBER} by ${BUILD_USER} (<${env.BUILD_URL}|View in Jenkins>)"
                }
            }
        }

        stage('SET EDX PLATFORM VERSION') {
            when {
                expression {
                    return params.EDX_PLATFORM_VERSION == ''
                }
            }
            steps {
                script{
                    EDX_PLATFORM_VERSION = env.GIT_BRANCH.split("origin/")[1]
                }
            }
        }
        
        stage('PREPARE PARAMS TO SKIP ASSETS') {
            when {
                expression {
                    return params.COMPILE_THEMES == false
                }
            }
            steps {
                script{
                    EXTRA_PARAMS = "${params.EXTRA_PARAMS} --skip-tags assets"
                }
            }
        }
        
        stage('RUN EDXAPP DEPLOYMENT') {
            when {
                expression { 
                    return params.DEPLOY_EDXAPP
                }
            }
            steps {
                build job: '(STEP) DEV-Juniper-edxapp',
                parameters: [
                    string(name: 'EDX_PLATFORM_VERSION', value: "${EDX_PLATFORM_VERSION}"),
                    string(name: 'BRANCH_SECURE_DATA', value: "${BRANCH_CUSTOMER_DATA}"),
                    string(name: 'BRANCH_CONFIGURATION', value: "${BRANCH_CONFIGURATION}"),
                    string(name: 'EXTRA_PARAMS', value: "${EXTRA_PARAMS}"),
                ]
            }
        }
        
        stage('RUN WORKERS DEPLOYMENT') {
            when {
                expression { 
                    return params.DEPLOY_WORKERS
                }
            }
            steps {
                build job: '(STEP) DEV-Juniper-workers',
                parameters: [
                    string(name: 'EDX_PLATFORM_VERSION', value: "${EDX_PLATFORM_VERSION}"),
                    string(name: 'BRANCH_SECURE_DATA', value: "${BRANCH_CUSTOMER_DATA}"),
                    string(name: 'BRANCH_CONFIGURATION', value: "${BRANCH_CONFIGURATION}"),
                    string(name: 'EXTRA_PARAMS', value: "${EXTRA_PARAMS}"),
                ]
            }
        }
    }
    
    post {
        success {
            wrap([$class: 'BuildUser']) {
                slackSend color: '#00ff99', message: "SUCCESSFUL - ${env.JOB_NAME} - BUILD NUMBER: ${env.BUILD_NUMBER} by ${BUILD_USER} (<${env.BUILD_URL}|View in Jenkins>)"
            }
        }
        aborted {
            slackSend color: '#ffa64d', message: "ABORTED!! - ${env.JOB_NAME} - BUILD NUMBER: ${env.BUILD_NUMBER} by ${BUILD_USER} (<${env.BUILD_URL}|View in Jenkins>)"
        }
        failure {
            wrap([$class: 'BuildUser']) {
                slackSend color: '#ff5050', message: "FAILED!! - ${env.JOB_NAME} - BUILD-NUMBER: ${env.BUILD_NUMBER} by ${BUILD_USER} (<${env.BUILD_URL}|View in Jenkins>)"
            }
        }
    }
}
