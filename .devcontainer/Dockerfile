FROM node:16-alpine

RUN apk --update --upgrade add git zsh zsh-autosuggestions zsh-syntax-highlighting && \
    rm -rf /var/cache/apk/* \
    && find / -type f -iname \*.apk-new -delete \
    && rm -rf /var/cache/apk/*

RUN sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" && \
    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k && \
    echo "source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ~/.zshrc && \
    echo "source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ~/.zshrc && \
    sed -i '/^ZSH_THEME/c\ZSH_THEME="powerlevel10k/powerlevel10k"' ~/.zshrc

ENV SHELL=/bin/zsh
ENV CHOKIDAR_USEPOLLING=true

RUN yarn global add @vue/cli @vue/cli-service-global vercel

WORKDIR /dev/app

COPY ../ /dev/app

RUN yarn install

ENTRYPOINT ["/bin/zsh"]
