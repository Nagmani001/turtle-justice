# starting secondary-backend

- start postgres locally using dokcer 
```
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=secretpassword postgres
```
- install dependencies 
```
npm install 
```
- migrate the database 
```
npx prisma migrate dev
```
- generate client 
```
npx prisma generate
```

- run the server 
```
npm run dev
```
