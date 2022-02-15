import React from "react"
import Typography from "@material-ui/core/Typography"

export const Thank = () => {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Дякуємо за замовлення.
      </Typography>
      <Typography variant="subtitle1">
        Ваше замовлення розглядається нашими спеціалістами. Статус вашого
        замовлення можна перевірити в особистому кабінеті.
      </Typography>
    </React.Fragment>
  )
}
