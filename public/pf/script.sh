for i in {1..100}
do
    wget  -O "$i.jpg" "https://picsum.photos/id/$i/300/300.jpg"
done
