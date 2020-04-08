<?php

namespace ACP\Export\Settings;

use AC;
use AC\View;
use ACP;

class Column extends AC\Settings\Column {

	/**
	 * @return array
	 */
	protected function define_options() {
		return [
			'export',
		];
	}

	private function is_enabled() {
		if ( $this->column->is_original() && ! $this->column instanceof ACP\Export\Exportable ) {
			return false;
		}

		if ( $this->column instanceof ACP\Export\Exportable && ! $this->column->export()->is_active() ) {
			return false;
		}

		return true;
	}

	private function get_disabled_instructions() {
		$view = new View();
		$view->set_template( 'tooltip/export-disabled' );

		return $view->render();
	}

	private function get_enabled_instructions() {
		$view = new View();
		$view->set_template( 'tooltip/export' );

		return $view->render();
	}

	/**
	 * @return View
	 */
	public function create_view() {

		$view = new View();
		$view->set( 'label', __( 'Export', 'codepress-admin-columns' ) )
		     ->set( 'instructions', $this->is_enabled() ? $this->get_enabled_instructions() : $this->get_disabled_instructions() )
		     ->set( 'setting',
			     sprintf( '<em>%s</em>', $this->get_status() )
		     );

		return $view;
	}

	private function get_status() {
		return ( $this->is_enabled() )
			? __( 'Enabled', 'codepress-admin-columns' )
			: __( 'Disabled', 'codepress-admin-columns' );
	}

}