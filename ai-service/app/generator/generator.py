import boto3

def generate_response(query):
    client = boto3.client("bedrock", region_name="us-east-1")
    response = client.invoke_model(
        modelId="anthropic.claude-v2",
        prompt=f"Q: {query}\nA:",
        maxTokens=200
    )
    return response["output"]
