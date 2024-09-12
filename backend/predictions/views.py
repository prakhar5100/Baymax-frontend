from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from predictions.ml_model import predict

@api_view(['POST'])
def predict_view(request):
    try:
        input_features = request.data.get('features', [])
        
        if len(input_features) != 134:
            return Response({"error": "Invalid input, 134 features are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        prediction = predict(input_features)
        
        return Response({"prediction": prediction}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
