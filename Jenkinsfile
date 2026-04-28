pipeline {
    agent any

    environment {
        PORTAINER_WEBHOOK = credentials('portainer-webhook')   
    }

    stages {
        stage('Build') {
            steps {
                echo "Construyendo imágenes Docker..."
                sh 'docker build -t reformas-backend:latest backend/'
                sh 'docker build -t reformas-frontend:latest frontend/'
            }
        }        

        stage('Deploy to Portainer') {
            steps {
                echo "Notificando a Portainer para actualizar el Stack..."
                sh 'curl -k -f -s -X POST "$PORTAINER_WEBHOOK"'
            }
        }
    } 

    post {
        success {
            echo '¡Despliegue completado con éxito!'
        }
        failure {
            echo 'Hubo un error en el Pipeline. Revisa los logs.'
        }
    }
}