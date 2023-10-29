## Website Schema:
### [Website Page](https://azweb.onrender.com):

![Homepage](public/ReadmeSources/migrations.jpg)

- _**SiteUserData**_ - an abstract entity denoting a website user and storing basic user information regardless of their role.
- _**Admin**_ - website administrator, manages reviews and handles purchases.
- _**User**_ - website user, buyer.
- _**HelpDeskSupportHistory**_ - entity representing the history of support requests, contains information about the request (topic, date, reason, status).
- _**Transaction**_ - entity responsible for a transaction, contains payment details.
- _**TransactionReceipt**_ - entity containing information about a purchase receipt.
- _**Cart**_ - virtual cart entity where the buyer adds items.
- _**ProductItem**_ - store item entity, stores basic information about the product.
- _**Category**_ - category entity; each item can belong to a category.
- _**Review**_ - entity representing reviews that buyers leave about purchased items.



# Лабораторные работы по курсу "Web-программирование"
## Змушко Андрей М33031

## Схема web-сайта:
### [Основная страница сайта](https://azweb.onrender.com):

![homepage](public/ReadmeSources/migrations.jpg)

- _**SiteUserData**_ - абстракная сущность, которая обозначает пользователя сайта и хранит себе базовую информацию о пользователе внезависимости от его роли
- _**Admin**_ - администратор сайта, регулирует отзывы, занимается закупками
- _**User**_ - пользователь сайта, покупатель
- _**HelpDeskSupportHistory**_ - сущность истории обращений в техподдержку, содержит информацию об обращении (тема, дата, причина, статус)
- _**Transaction**_ - сущность, отвечающая за транзакцию, содержит детали оплаты
- _**TransactionReceipt**_ - сущность, содержашая в себе информацию о чеке покупки
- _**Cart**_ - сущность виртуальной корзины, в которую покупатель складывает товары
- _**ProductItem**_ - сущность товара магазина, хранит в себе базовую информацию о товаре
- _**Category**_ - сущность категории. каждый товар может относиться к категории
- _**Review**_ - сущность отзова, которые покупатели оставляют о купленном товаре
