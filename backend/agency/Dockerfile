# Используем официальный образ Python в качестве базового образа
FROM python
# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app
# Копируем файл requirements.txt внутрь контейнера
COPY req.txt ./
# Устанавливаем зависимости, описанные в файле requirements.txt
RUN pip install -r req.txt


COPY docker-entrypoint.sh .
RUN chmod +x /usr/src/app/docker-entrypoint.sh
ENTRYPOINT sh /usr/src/app/docker-entrypoint.sh