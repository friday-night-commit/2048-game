# REST API specification

This is a REST API specification for a 2048 game forum.

### Base URL

    http://localhost:5000
    
### Content types

    - Payload: application/json

    - Response: application/json

### Common responses

    - 400 Bad Request (invalid syntax)

      Example value: {"reason": "..."}

    - 401 Unauthorized

    - 500 Server Error

# Forum topics

## Get list of topics

### Request

`GET /forum/topics`

### Responses

    - 200 OK

      Example value: [{"id":1, "title":"...", "text":"...", "user_id":3478, "created_at": "...", "updated_at": "..."}, ...]

## Create a new topic

### Request

`POST /forum/topics`

### Payload

   `{"title":"...", "text":"..."}`

### Responses

    - 200 OK

      Example value: {"id":1423}

## Get a specific topic

### Request

`GET /forum/topics/:id`

### Responses

    - 200 OK

      Example value: {"id":145, "title":"...", "text":"...", "user_id":3478, "created_at": "...", "updated_at": "..."}

    - 404 Not Found

      Example value: {"reason": "Topic #<id> not found"}

## Edit a specific topic

### Request

`PUT /forum/topics/:id`

### Payload

   `{"id": 24, "title":"...", "text":"...", "user_id":3478, "created_at": "...", "updated_at": "..."}`

### Responses

    - 200 OK

      Example value: {"id":24}`

    - 403 Forbidden

      Example value: {"reason": "No rights to edit topic"}

    - 404 Not Found

      Example value: {"reason": "Topic #<id> not found"}

## Delete a specific topic

### Request

`DELETE /forum/topics/:id`

### Responses

    - 200 OK

    - 403 Forbidden

      Example value: {"reason": "No rights to edit topic"}

    - 404 Not Found

      Example value: {"reason": "Topic #<id> not found"}

# Forum comments

## Get list of topic comments

### Request

`GET /forum/topics/:id/comments`

### Responses

    - 200 OK

      Example value: [{"id":14, "topic_id":1312, "comment_id": null, "text":"...", "user_id":3478, "created_at": "...",
      reactions: [{"id":13, "comment_id": 14, "type":"happy", "user_id":38, "created_at": "..."}, ...]}, ...]

    - 404 Not Found

      Example value: {"reason": "Topic #<id> not found"}

## Create a new comment

### Request

`POST /forum/topics/:id/comments`

### Payload

   `{"comment_id":null, "text":"..."}`

   or (replying on a comment)

   `{"comment_id":4673, "text":"..."}`

### Responses

    - 200 OK

      Example value: {"id":1423}

    - 404 Not Found

      Example value: {"reason": "Topic #<id> not found"}

## Delete a specific comment

### Request

`DELETE /forum/topics/:id/comments/:id`

### Responses

    - 200 OK

    - 403 Forbidden

      Example value: {"reason": "No rights to delete comment"}

    - 404 Not Found

      Example value: {"reason": "Comment #<id> not found"}

## Create a new reaction

### Request

`POST /forum/topics/:id/comments/:id/reactions`

### Payload

   `{"type":"happy"}`

### Responses

    - 200 OK

      Example value: {"id":1423}

    - 404 Not Found

      Example value: {"reason": "Comment #<id> not found"}
