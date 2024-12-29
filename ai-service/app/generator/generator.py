import boto3

def generate_response(query):
    client = boto3.client('bedrock-agent-runtime')
    response = client.retrieve_and_generate(
        input={
            'text': f'{query}'
        },
        retrieveAndGenerateConfiguration={
            'knowledgeBaseConfiguration': {
                'knowledgeBaseId': '6UZUSGZMXB',
                'modelArn': 'anthropic.claude-v2:1',
                'generationConfiguration': {
                    'inferenceConfig': {
                        'textInferenceConfig': {
                            'maxTokens': 512,
                            'temperature': 0.2,
                            'topP': 0.8
                        }
                    }
                }
            },
            'type': 'KNOWLEDGE_BASE'
        }
    )
    
    return response["output"]["text"]