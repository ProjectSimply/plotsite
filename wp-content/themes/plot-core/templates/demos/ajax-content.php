<h4>Lovely Asyncronous Content</h4>

<p>And look it returns our data sent to it too:</p>

<table>

	<?php foreach($plotData as $key => $value) : ?>

		<tr>
			<td><?= $key ?></td>
			<td><?= $value ?></td>
		</tr>

	<?php endforeach; ?>

</table>