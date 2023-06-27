from django.http import HttpResponse

class CORSMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self,request):
        if(request.method == "OPTIONS"):
            response = HttpResponse()
            response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
            response.headers["Access-Control-Allow-Headers"] = "content-type, sessionid, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method, Access-Control-Allow-Credentials, Connection, Host, Origin, Referer, Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site, User-Agent, language, problemcode"
            response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.status_code=200
            return response

        response = self.get_response(request)

        response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response.headers["Access-Control-Allow-Headers"] = "content-type, sessionid, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method, Access-Control-Allow-Credentials, Connection, Host, Origin, Referer, Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site, User-Agent, language, problemcode"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        
        return response