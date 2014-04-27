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
    vagrant up
    gunicorn -D app.app:app -b 0.0.0.0:9000 &
    echo 'Server listening on port 9000'
    deactivate
}
stop() {
    kill $(ps -A | grep 'gunicorn -D app.app' | awk '{ print $1 }')
}
case "$1" in
    'run')
        install
        run
        ;;
    'install')
        install
        ;;
    'stop')
        stop
        ;;
    'restart')
        stop
        run
        ;;
esac