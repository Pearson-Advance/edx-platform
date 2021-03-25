pipeline {
    agent any

    stages {
        stage('Define environment') {
            steps {
                script {
                    EDX_PLATFORM_VERSION = env.GIT_BRANCH.split("origin/")[1]
                    
                    if(EDX_PLATFORM_VERSION ==~ /(.*).master$/){
                        ENVIRONMENT = "production"
                    }
                    
                    if(EDX_PLATFORM_VERSION ==~ /(.*).stage/){
                        ENVIRONMENT = "stage"
                    }                      
                }
            }
        }
        
        stage('Run Development Deployment') {
            when {
                expression {
                    return ENVIRONMENT == "stage"
                }
            }
            steps {
                build job: '(DEPLOY) DEV-Juniper-edxapp',
                parameters: [
                    string(name: 'EDX_PLATFORM_VERSION', value: "${EDX_PLATFORM_VERSION}"),
                    string(name: 'BRANCH_CUSTOMER_DATA', value: "${ENVIRONMENT}"),
                    string(name: 'BRANCH_CONFIGURATION', value: "pearson-release/juniper.master"),
                    booleanParam(name: 'COMPILE_THEMES', value: false),
                    booleanParam(name: 'DEPLOY_EDXAPP', value: true),
                    booleanParam(name: 'DEPLOY_WORKERS', value: true),
                    string(name: 'EXTRA_PARAMS', value: ""),
                ]
            }
        }
        
        stage('Run Production Deployment') {
            when {
                expression {
                    return ENVIRONMENT == "production"
                }
            }
            steps {
                build job: '(DEPLOY) PROD-Juniper-edxapp',
                parameters: [
                    booleanParam(name: 'PREPARE_DEPLOYMENT_ENVIRONMENT', value: true),
                    booleanParam(name: 'SET_GLOBAL_PARAMETERS', value: true),
                    booleanParam(name: 'LAUNCH_DEPLOYMENT_INSTANCE', value: true),
                    booleanParam(name: 'DEPLOY_EDX_PLATFORM_ON_SINGLE_INSTANCE', value: true),
                    booleanParam(name: 'CREATE_UPDATED_ASG', value: true),
                    booleanParam(name: 'ATTACH_ASG_TO_ELB', value: true),
                    string(name: 'BRANCH_PLAYBOOKS', value: "pearson/prod/juniper"),
                    string(name: 'BRANCH_CONFIGURATION', value: "pearson-release/juniper.master"),
                    string(name: 'BRANCH_CUSTOMER_DATA', value: "${ENVIRONMENT}"),
                    string(name: 'AMI_ID', value: ""),
                    booleanParam(name: 'ASYNC_SERVERS_DEPLOY', value: true),
                    booleanParam(name: 'ENABLE_PAUSE_CHECKS', value: false),
                    string(name: 'DEPLOYMENT_WORKDIR', value: "ags_juniper_edxapp_sync"),
                ]
            }
        }
    }
}
