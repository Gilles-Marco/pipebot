export function processing_request(request, discord_client){
    return {
        "status": 200,
        "options": {'Content-Type': 'text/html'},
        "body": "We got your request"
    }
}