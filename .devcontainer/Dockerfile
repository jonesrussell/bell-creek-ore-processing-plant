#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

# To fully customize the contents of this image, use the following Dockerfile instead:
# https://github.com/microsoft/vscode-dev-containers/tree/v0.117.0/containers/javascript-node-10/.devcontainer/Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-10

ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG USERNAME=node

# [Optional] Update UID/GID if needed
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
    groupmod --gid $USER_GID $USERNAME \
    && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
    && chown -R $USER_UID:$USER_GID /home/$USERNAME; \
    fi

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
   && apt-get -y install --no-install-recommends zsh \
   && apt-get autoremove -y \
   && apt-get clean -y \
   && rm -rf /var/lib/apt/lists/*
ENV DEBIAN_FRONTEND=dialog

USER $USER_UID

RUN mkdir -p /home/${USERNAME}/.vscode-server/extensions \
    && mkdir -p ~/.vscode-server-insiders/extensions
