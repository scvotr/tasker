## О проекте

Данный репозиторий содержит пет проект который позволяет назначать
задачи между отделами в рамках одной организации.
Проект реализован на стеке React + NodeJS + Sqlite3

## Демо приложение

Демо приложение представляет собой простой не публичный (требуется вход) менеджер задач.

При запуске создается учетные записи предустановленных пользователей.\
Пароли для пользователей совпадают с их email, которые можно просмотреть через учетную запись администратора.

Учетная запись администратора admin, пароль для входа 0091.\
В качестве бэкенда используется server Node.js (запускается отдельно)

## Установка и запуск

Серверная часть:
```
$ cd bk
$ npm i
$ node server.js
```
Фронтенд часть:
```
$ cd fr
$ npm i
$ npm start
```
По умолчанию демо доступно (http://localhost:3070) .\
Адрес сервера API по умолчанию настроен на (http://localhost:3070).

## Основные идеи

Идей для создания такого приложения послужила реальная задача в рамках холдинга 
Для управляющей компании требовалось назначать задачи дочерним структурам Но в связи
с большой текучестью кадров и отсутствием доступа у штатных  сотрудников кроме руководства к приложению,
было решено что назначение задач между подразделениями и при назначение задач выбирается только ответственная служба подразделения. После получения задачи руководитель службы выбирает ответственный отдел в рамках своей службы. 

Сотрудникам управляющей компании доступны все подразделения для назначения задач.\
Руководителям служб подразделений доступны только отделы входящие в состав службы.

Сотрудник создает задачу, указывает подразделение. Руководитель подразделения согласовывает задачу. 
Руководитель подразделения назначает ответственного за исполнение задачи. После исполнение задачи Руководителем ответственного подразделения ставится отметка о выполнении и задача направляется на проверку назначенному лицу. После подтверждения о выполнении задача закрывается.

## Загрузка графических файлов

Вся обработка графических файлов происходит на сервере.\
Для работы c графическими файлами используется sharp.\
Также доступно превью файла, удаление и добавление ления новых графических файлов к задачам.