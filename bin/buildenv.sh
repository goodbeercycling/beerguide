#!/bin/bash
KEY=$( aws secretsmanager get-secret-value  --secret-id beerguide-maps-api-key | jq --raw-output '.SecretString' )
echo "REACT_APP_GOOGLE_MAPS_API_KEY=$KEY" > .env
