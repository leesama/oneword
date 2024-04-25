FROM node:12

# 创建并设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果有的话）
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 暴露 3000 端口
EXPOSE 3000

# 运行应用
CMD ["npm", "start"]