FROM node:16

WORKDIR /home/web-youtubedl

COPY . .

RUN npm i -g pnpm
RUN cd web-express-youtubedl && pnpm i
RUN cd web-express-youtubedl && pnpm build
RUN cd web-react-youtubedl && pnpm i
RUN cd web-react-youtubedl && pnpm build

EXPOSE 8080
CMD ["pnpm", "start"]