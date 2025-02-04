#!/bin/bash

# Set the number of concurrent requests
requests=100

# Define the API URL
api_url="http://localhost:3001/api/v2/users"

# Initialize an array to store the responses
responses=()

# Start the timer
start_time=$(date +%s)

# Send concurrent GET requests using curl
for((i=1; i <=$requests;i++ )); do
    response=$(curl -X GET --header 'accept: application/json' "http://localhost:3001/api/v2/users")
    responses[$i]=$response
done

# Stop the timer
end_time=$(date +%s)

# Calculate the total time taken
total_time=$((end_time - start_time))

# Check for inconsistencies in the responses
for((i=1; i <=$requests;i++ )); do
    if [[ "${responses[$i]}" != "${responses[1]}" ]]; then
        echo "Race condition detected! Response $i differs from response 1."
        exit 1
    fi
done

# No race condition detected
echo "No race condition detected. Total time taken: $total_time seconds."

