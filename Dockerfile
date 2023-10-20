FROM node:18

WORKDIR /home/web-youtubedl

COPY . .

RUN npm i -g bun
RUN cd web-express-youtubedl && bun i
RUN cd web-react-youtubedl && bun i
RUN cd web-react-youtubedl && npm run build

ENV PORT=80

EXPOSE 80
CMD bun start