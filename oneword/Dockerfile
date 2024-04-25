# 使用官方 Node.js 作为基础镜像
FROM node:12

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json (如果存在)
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件和文件夹到工作目录
COPY . .

# 构建应用
RUN npm run build

# 暴露容器的 80 端口
EXPOSE 80

# 安装一个简单的 http 服务器来服务项目
RUN npm install -g http-server

# 运行 http 服务器
CMD ["http-server", "dist", "-p", "80"]
