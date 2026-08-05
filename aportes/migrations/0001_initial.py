from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Aporte",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nombre", models.CharField(max_length=120)),
                ("comunidad", models.CharField(max_length=100)),
                ("mensaje", models.TextField(max_length=5000)),
                ("revisado", models.BooleanField(default=False)),
                ("creado", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "aporte",
                "verbose_name_plural": "aportes",
                "ordering": ["-creado"],
            },
        )
    ]
