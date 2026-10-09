import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


REGIONES = ["Costa Caribe Norte", "Costa Caribe Sur", "Pacífico", "Centro-Norte"]

COMUNIDADES = [
    ("Mískitu", "Costa Caribe Norte"),
    ("Mayangna/Sumu", "Costa Caribe Norte"),
    ("Rama", "Costa Caribe Sur"),
    ("Garífuna", "Costa Caribe Sur"),
    ("Creole", "Costa Caribe Sur"),
    ("Chorotega", "Pacífico"),
    ("Nahoa (Náhuatl)", "Pacífico"),
    ("Sutiaba (Xiu)", "Pacífico"),
    ("Matagalpa-Cacaopera", "Centro-Norte"),
    ("Mestizo", None),
]


def cargar_catalogos(apps, schema_editor):
    Region = apps.get_model("aportes", "Region")
    Comunidad = apps.get_model("aportes", "Comunidad")
    regiones = {nombre: Region.objects.create(nombre=nombre) for nombre in REGIONES}
    for nombre, region in COMUNIDADES:
        Comunidad.objects.create(nombre=nombre, region=regiones.get(region))


def migrar_comunidades(apps, schema_editor):
    """Convierte el texto libre anterior en una referencia a Comunidad."""
    Aporte = apps.get_model("aportes", "Aporte")
    Comunidad = apps.get_model("aportes", "Comunidad")
    for aporte in Aporte.objects.all():
        texto = aporte.comunidad_texto.strip() or "Sin especificar"
        comunidad = Comunidad.objects.filter(nombre__iexact=texto).first()
        if comunidad is None:
            comunidad = Comunidad.objects.create(nombre=texto[:100])
        aporte.comunidad_ref = comunidad
        aporte.save(update_fields=["comunidad_ref"])


def revertir_comunidades(apps, schema_editor):
    Aporte = apps.get_model("aportes", "Aporte")
    for aporte in Aporte.objects.select_related("comunidad_ref"):
        aporte.comunidad_texto = aporte.comunidad_ref.nombre
        aporte.save(update_fields=["comunidad_texto"])


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("aportes", "0002_aporte_usuario"),
    ]

    operations = [
        migrations.CreateModel(
            name="Region",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nombre", models.CharField(max_length=60, unique=True)),
            ],
            options={"verbose_name": "región", "verbose_name_plural": "regiones", "ordering": ["nombre"]},
        ),
        migrations.CreateModel(
            name="Comunidad",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nombre", models.CharField(max_length=100, unique=True)),
                (
                    "region",
                    models.ForeignKey(
                        blank=True,
                        help_text="Vacío cuando el pueblo está presente en todo el país.",
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="comunidades",
                        to="aportes.region",
                    ),
                ),
            ],
            options={"verbose_name": "comunidad", "verbose_name_plural": "comunidades", "ordering": ["nombre"]},
        ),
        migrations.RunPython(cargar_catalogos, migrations.RunPython.noop),
        migrations.RenameField("aporte", "comunidad", "comunidad_texto"),
        migrations.AddField(
            model_name="aporte",
            name="comunidad_ref",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="aportes",
                to="aportes.comunidad",
            ),
        ),
        migrations.RunPython(migrar_comunidades, revertir_comunidades),
        migrations.RemoveField("aporte", "comunidad_texto"),
        migrations.RenameField("aporte", "comunidad_ref", "comunidad"),
        migrations.AlterField(
            model_name="aporte",
            name="comunidad",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="aportes",
                to="aportes.comunidad",
            ),
        ),
        migrations.AddField(
            model_name="aporte",
            name="revisado_por",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="aportes_revisados",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterModelOptions(
            name="aporte",
            options={
                "ordering": ["-creado"],
                "permissions": [("revisar_aporte", "Puede revisar y aprobar aportes")],
                "verbose_name": "aporte",
                "verbose_name_plural": "aportes",
            },
        ),
    ]
