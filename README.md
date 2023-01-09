# Bibliopus

The goal of bibliopus is helping people to read more and find new books while assisting local bookshops with their visibility, their logistics and their management.

To achieve this, we have embarked on a journey to craft the best apps for readers and tools for booksellers, thus forming the bibliopus ecosystem.

## Setup

### Using Devbox (recommended)

Install [Devbox](https://www.jetpack.io/devbox/docs/installing_devbox/) on your machine if not already done.

Then just enter the devbox shell. 
```sh
> devbox shell
```

This should provide a nodejs environment and install dependencies using `npm install`.

Inside the devbox shell you can execute any command, this is a very useful way to handle virtual development environments.

### Manual install

If you already have a development environment setup with Node 18+ installed you just have to install necessary dependencies.
```sh
> npm install
```

We still recommend using a node version manager like [Volta](https://volta.sh/).

## Development

To get the project running in development mode just run `npm run dev` at the root of the monorepo, this will execute the `dev` script in all the workspaces.