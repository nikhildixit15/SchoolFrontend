
export function getClassOptionList(classes=[]) {
    const list = [];
    classes.map((item) => {
      list.push({
        id: item.id,
        value: item.className,
        label: item.className,
        sec: item.sec,
      });
    });
   return list;;
  }
