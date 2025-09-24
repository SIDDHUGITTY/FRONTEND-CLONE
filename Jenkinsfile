pipeline {
    agent any

    environment {
        IMAGE_NAME = "frontend-image"
        CONTAINER_NAME = "frontend-container"
        PORT = "8081"
    }

    stages {
        stage('SCM CHECKOUT') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/SIDDHUGITTY/FRONTEND-CLONE.git'
            }
        }
        stage('CLEANUP') {
            steps {
                sh """
                   if [ \$(docker ps -aq -f name=${CONTAINER_NAME}) ]; then
                       echo "Stopping and removing old container..."
                       docker stop ${CONTAINER_NAME}
                       docker rm ${CONTAINER_NAME}
                       echo "Removing old images..."
                       docker rmi -f ${IMAGE_NAME}
                   fi
                """
            }
        }
        stage('BUILD') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }
        stage('RUN') {
            steps {
                sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT}:${PORT} ${IMAGE_NAME}"
            }
        }
    }

}
