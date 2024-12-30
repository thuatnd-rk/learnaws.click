import boto3
client = boto3.client('bedrock-agent-runtime')
def generate_response(query):
   
    response = client.retrieve_and_generate_stream(
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
   
    return response
 
response = generate_response('What is EC2')
rs = ''
for i in response['stream']:
    try:
        if i['output']['text']:
            rs += i['output']['text']
            print (i['output']['text'])
    except:
        continue
print(rs)