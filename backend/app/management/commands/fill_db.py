import random

from django.core.management.base import BaseCommand
from ...models import *
from faker import Faker
from datetime import datetime, timedelta, timezone


def generate_phone_number():
    digits = "0123456789"
    length = random.randint(9, 10)
    return "7" + "".join(random.choice(digits) for i in range(length))

def generate_flat_description():
    arr = [
        "Продается однокомнатная квартира в экологически чистом Лотошинском районе Московской области. (130 км от МКАД Ново-Рижское шоссе.) Адрес: Лотошинский район, пос.Лотошино, ул.Западная, д. 2 – менее 500 метров «Автостанция Лотошино». Квартира расположена 5-м этаже 5 – ти этажного панельного жилого дома. Год постройки дома 1995. Общая площадь квартиры 37,9 м²; Жилая: 19,4 м²; Кухня: 9,7 м²; прихожая 5,1 м². Сан/узел раздельный. Окна ПВХ. Все коммуникации центральные: холодное и горячее водоснабжение, магистральный газ, канализация, отопление, установлены счётчики водомеры. Квартира в жилом состоянии, пригодная для проживания и сдачи в аренду. В шаговой доступности магазины, детский сад, школа, бассейн, скверы и детские площадки. Документы оформлены и подготовлены к сделке, один взрослый собственник. В собственности с 2019 года наследство по закону. Возможна покупка в ИПОТЕКУ. Как проехать: На автобусах № 307/28/38, 467, 467/38, 467/39, 467/53 от станции метро «Тушинская» до остановки «Автостанция Лотошино». На автомобиле по Новорижскому шоссе около 100 км до Волоколамска, дальше через город по улице Ленина прямо 10 км, далее поворот налево, затем прямо 20 км.",
        "Продается однокомнатная квартира в центре Волоколамска, по адресу: проезд Школьный, д.7. Квартира расположена на пятом этаже пятиэтажного кирпичного дома. Дом построен в 1965 году. Площадь общая 30,6 кв.м. Комната 18,5 кв.м. Кухня 6,2кв.м. Санузел совмещенный. Балкона нет. Квартира в среднем состоянии, требует косметического ремонта. Все коммуникации центральные. Вся развитая городская инфраструктура в ближайшей шаговой доступности: супермаркеты и различные магазины, школы и детские сады, аптека и поликлиника, больница, множество торговых центров, Макдональдс, дворец спорта с бассейном, отделения почты и банков, общественный транспорт и т.д. Квартира в собственности на основании договора дарения менее 3 лет.",
        "Продается однокомнатная квартира в новом доме города Волоколамска, по адресу: 2-й Шаховской проезд, д.25 (микрорайон Благодар). Дом СДАН в 2019 году и полностью заселен! Квартира расположена на третьем этаже трехэтажного панельного жилого дома. Площадь квартиры 37,5 кв.м. Кухня 8,2 кв.м. Комната 17,4 кв.м. Сан/узел совместный. Есть балкон. В квартире автономное газовое отопление, что удобно и позволяет существенно экономить на коммунальных платежах. Стоимость всех коммунальных услуг, при условии проживании семьи из 3х человек, около 3000р в месяц! Квартира не угловая. Окна ПВХ. Квартира в нормальном состоянии, пригодна для проживания и сдаче в аренду. На территории микрорайона Благодар действует новая общеобразовательная школа, есть продуктовый магазин, фитнес-клуб и автобусная остановка. Во дворе дома новая детская игровая площадка. Просторная придворовая территория исключает проблему с парковкой автомобилей. Квартира в собственности, продажа по прямому договору купли-продажи. Один взрослый собственник, покупали у застройщика. Никто не прописан. Ипотека приветствуется!"
    ]

    return random.choice(arr)

def generate_flat_address():
    arr = ["Волоколамский район, г. Волоколамск, ул.50 лет Октября", "Лотошинский район, пос. Новолотошино, ул.Западная, 2", "Волоколамский район, г. Волоколамск, Школьный проезд, д.7"]
    return random.choice(arr)

def get_random_renter():
    return CustomUser.objects.filter(is_renter=True).order_by('?')[0]

def get_random_user():
    return CustomUser.objects.filter(is_renter=False).order_by('?')[0]

def get_random_flat():
    return Flat.objects.all().order_by('?')[0]

def random_date():
    now = datetime.now(tz=timezone.utc)
    return now + timedelta(random.uniform(-1, 0) * 100)

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        print("fill_db")
        CustomUser.objects.all().delete()
        Flat.objects.all().delete()
        Deal.objects.all().delete()
        Order.objects.all().delete()

        fake = Faker("ru_RU")

        for i in range(1, 10):
            CustomUser.objects.create_user(fake.name(), f"user{i}@user.com", generate_phone_number())

        for i in range(1, 10):
            CustomUser.objects.create_renter(fake.name(), f"renter{i}@renter.com", generate_phone_number())

        for renter in CustomUser.objects.filter(is_renter=True):
            for _ in range(random.randint(1, 3)):
                flat = Flat(
                    renter=renter,
                    rooms=random.randint(1, 4),
                    floor=random.randint(2, 20),
                    balcony=random.randint(1, 2),
                    parking=random.randint(1, 2),
                    price=random.randint(100, 250) * 100000,
                    square=random.randint(10, 30),
                    description=generate_flat_description(),
                    address=generate_flat_address(),
                    image=f"flats/{random.randint(1, 8)}.jpeg"
                )
                flat.save()

        for user in CustomUser.objects.filter(is_renter=False):
            for _ in range(random.randint(1, 3)):
                deal = Deal(
                    user=user,
                    flat=get_random_flat(),
                    status=random.randint(1, 2),
                    date=random_date()
                )
                deal.renter = deal.flat.renter
                deal.save()

            for _ in range(random.randint(1, 5)):
                order = Order(
                    user=user,
                    type=random.randint(1, 2),
                    status=random.randint(1, 3),
                    date=random_date(),
                    rooms=random.randint(1, 4),
                    price=random.randint(100, 250) * 100000,
                    square=random.randint(10, 30),
                )
                order.save()

        for renter in CustomUser.objects.filter(is_renter=True):
            for _ in range(random.randint(1, 3)):
                deal = Deal(
                    renter=renter,
                    user=get_random_user(),
                    status=random.randint(1, 2),
                    date=random_date()
                )
                deal.flat = Flat.objects.filter(renter=renter).order_by('?')[0]
                deal.save()

        CustomUser.objects.create_superuser("root", "root@root.com", generate_phone_number())

        print("Данные успешно сгенерированы")

