#!/bin/sh
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

venv_up() {
    source env/bin/activate;
}
install() {
    if [ ! -d "env" ]; then
        virtualenv env
    fi
    venv_up
    pip install -r $DIR/requirements.txt
    deactivate
}
run() {
    venv_up
    gunicorn -D -w 4 app.app:app &
    deactivate
}
stop() {
    kill $(ps -A | grep 'gunicorn -w 4 app.app' | awk '{ print $1 }')
}
case "$1" in
    'run')
    install
        run
        ;;
    'install')
        install
        ;;
    'kill')
        stop
        ;;
    'restart')
        stop
        run
        ;;
esac