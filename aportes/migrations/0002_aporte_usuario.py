import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("aportes", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="aporte",
            name="usuario",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="aportes_culturales",
                to=settings.AUTH_USER_MODEL,
            ),
        )
    ]
