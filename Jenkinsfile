pipeline {
    agent any
    triggers {
      githubPush()
    }
    stages {
        stage('SCM checkout') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/SIDDHUGITTY/FRONTEND-CLONE.git'
            }
        }
        stage('BUILD') {
            steps {
                sh '''docker build -t test-image .
                      docker run -d --name test-container -p 8081:8081 test-image'''
            }        
        }
    }
}
