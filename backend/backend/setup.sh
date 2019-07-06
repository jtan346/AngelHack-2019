aws configure set aws_access_key_id ${aws_id}
aws configure set aws_secret_access_key ${aws_key}
python manage.py migrate
python manage.py loaddata test_db.json