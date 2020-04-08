<?php

namespace ACP\Export;

use AC;
use AC\Asset\Location;
use AC\Asset\Script;
use AC\Asset\Style;
use ACP;
use ACP\Export\Asset;
use ACP\Export\Asset\Script\Table;

class Addon implements AC\Registrable {

	/**
	 * @var Location
	 */
	private $location;

	public function __construct( Location $location ) {
		$this->location = $location;
	}

	public function register() {
		new Admin( new ExportDirectory() );

		$this->register_table_screen_options();

		$settings = new Settings( [
			new Style( 'acp-search-admin', $this->location->with_suffix( 'assets/search/css/admin.css' ) ),
		] );

		$settings->register();

		add_action( 'ac/table/list_screen', [ $this, 'register_table_screen' ] );
		add_action( 'ac/table/list_screen', [ $this, 'load_list_screen' ] );
	}

	public function register_table_screen() {
		$table_screen = new TableScreen( [
			new Style( 'acp-export-listscreen', $this->location->with_suffix( 'assets/export/css/listscreen.css' ) ),
			new Table( 'acp-export-listscreen', $this->location->with_suffix( 'assets/export/js/listscreen.js' ) ),
		] );

		$table_screen->register();
	}

	public function register_table_screen_options() {
		new TableScreenOptions( [
			new Script( 'acp-export-table-screen-options', $this->location->with_suffix( 'assets/export/js/table-screen-options.js' ) ),
		] );
	}

	/**
	 * Load a list screen and potentially attach the proper exporting information to it
	 *
	 * @param AC\ListScreen $list_screen List screen for current table screen
	 *
	 * @since 1.0
	 */
	public function load_list_screen( AC\ListScreen $list_screen ) {
		if ( $list_screen instanceof ListScreen ) {
			$list_screen->export()->attach();
		}
	}

}