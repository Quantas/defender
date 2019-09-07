FROM node:11

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# The node image comes with a base non-root 'node' user, so the alternate
# user here is primarily for Linux scenarios where you need to match your local
# user UID/GID. See https://aka.ms/vscode-remote/containers/non-root-user.
ARG USERNAME=vscode
ARG USER_UID=1001
ARG USER_GID=$USER_UID

# Configure apt and install packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
    #
    # Verify git and needed tools are installed
    && apt-get install -y git procps \
    #
    # Create a non-root user to use if preferred - see https://aka.ms/vscode-remote/containers/non-root-user.
    && if [ "$USER_GID" != "1000" ]; then groupadd --gid $USER_GID $USERNAME; fi \
    && if [ "$USER_UID" != "1000" ]; then useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME; fi \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=
