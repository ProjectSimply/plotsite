<?php

namespace ACP\Settings\ListScreen;

use AC\Collection;

class HideOnScreenCollection extends Collection {

	public function add( HideOnScreen $hide_on_screen ) {
		$this->put( $hide_on_screen->get_name(), $hide_on_screen );

		return $this;
	}

}