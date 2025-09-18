pipeline {
    agent any

    environment {
        // Docker registry & images
        REGISTRY = 'farmanali786'
        BACKEND_IMAGE = "${REGISTRY}/my-backend:latest"
        FRONTEND_IMAGE = "${REGISTRY}/my-frontend:latest"

        // Production server
        PROD_SERVER = "ubuntu@ec2-13-60-17-158.eu-north-1.compute.amazonaws.com"
        DEPLOY_PATH = "/home/ubuntu/reactapp"

        // App-specific environment variables
        NODE_ENV = "production"
        BACKEND_PORT = "5000"
        FRONTEND_PORT = "80"
        API_URL = "http://$PROD_SERVER/api"   // frontend can call backend via relative /api path through Nginx
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/FarmanNaqvi/ReactApp.git', credentialsId: 'git-creds'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE ./backend'
                sh 'docker build -t $FRONTEND_IMAGE ./frontend'
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $BACKEND_IMAGE
                        docker push $FRONTEND_IMAGE
                    """
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'aws-ec2-key', keyFileVariable: 'SSH_KEY')]) {
                    sh """
                        ssh -i $SSH_KEY -o StrictHostKeyChecking=no $PROD_SERVER '
                            mkdir -p $DEPLOY_PATH &&
                            cd $DEPLOY_PATH &&
                            docker compose down || true &&
                            docker compose pull &&
                            docker compose up -d --remove-orphans
                        '
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Deployment finished.'
        }
    }
}
