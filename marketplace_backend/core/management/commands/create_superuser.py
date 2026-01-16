from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Create a default superuser'

    def handle(self, *args, **options):
        email = 'admin@example.com'
        username = 'admin'
        password = 'admin123'

        if not User.objects.filter(email=email).exists():
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            self.stdout.write(self.style.SUCCESS('Default superuser created'))
        else:
            self.stdout.write(self.style.WARNING('Superuser already exists'))

