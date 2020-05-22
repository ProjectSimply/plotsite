<?php 

class PlotFindAndReplace
{

  private $stringTypes = [ 'CHAR' , 'VARCHAR' , 'BINARY' , 'VARBINARY' , 'BLOB' , 'TEXT' , 'ENUM' , 'SET'];
  private $searchNonHttps = "";
  private $searchHttps = "";
  private $replace = "";

    public function __construct($search=null,$replace=null)
    {

        ini_set('memory_limit','3200M');

        global $wpdb;

        if(!$search || !$replace)
            return false;

        $strippedSearch = str_replace('https://', '', $search);
        $strippedSearch = str_replace('http://', '', $strippedSearch);

        $this->searchNonHttps = "http://" . $strippedSearch;
        $this->searchHttps = "https://" . $strippedSearch;
        $this->replace = $replace;

        // First, get a list of tables

        $tables = $wpdb->get_results("SHOW TABLES");

        foreach ($tables as $tableData) :

            foreach ($tableData as $table) :

                $tableInfo = $wpdb->get_results("DESCRIBE $table");

                $columnsToSearch = [];

                $key = '';
                
                foreach($tableInfo as $info) :

                    if($this->similar_in_array($info->Type, $this->stringTypes)) :

                        $columnsToSearch[] = $info->Field;

                    endif;

                    if($info->Key == 'PRI')
                        $key = $info->Field;
                    
                endforeach;

                $searchString = "SELECT * FROM $table WHERE ";

                if(!$columnsToSearch)
                    continue;

                foreach($columnsToSearch as $i => $column) :

                    $searchString .= "$column LIKE '%$this->searchHttps%' OR $column LIKE '%$this->searchNonHttps%'";

                    if($i < sizeof($columnsToSearch) - 1) :

                        $searchString .= " OR ";

                    endif;

                endforeach;

                $searchResults = $wpdb->get_results($searchString);

                if(!$searchResults)
                    continue;

                foreach($searchResults as $result) :

                    $columnsToReplace = [];

                    $currentIndex = $result->{$key};

                    foreach($columnsToSearch as $column) :

                        $dataToReplace = $result->{$column};

                        $fixed = $this->recursive_unserialize_replace($this->searchNonHttps,$this->replace,$dataToReplace);
                        $fixed = $this->recursive_unserialize_replace($this->searchHttps,$this->replace,$fixed);

                        if($fixed != $dataToReplace) :

                            $columnsToReplace[$column] = $fixed;

                        endif;

                    endforeach;

                    if($columnsToReplace) :

                        $formatData = [];
           
                        foreach($columnsToReplace as $column => $value) :

                            $formatData[] = '%s';
                            
                        endforeach;

                        $wpdb->update( 
                            $table, 
                            $columnsToReplace, 
                            [$key => $currentIndex], 
                            $formatData, 
                            ['%d'] );

                    endif;


                endforeach;

            endforeach;

        endforeach;

    }

    private function processSerializedData($data) {

        return $data;
    }

    private function similar_in_array( $sNeedle , $aHaystack )
    {
        
        foreach ($aHaystack as $sKey)
        {

            if( stripos( $sNeedle , $sKey ) !== false )
            {
                return true;
            }
        }
        
        return false;
    }
    //  ---------

    private function recursive_array_replace($find, $replace, &$data) {
        
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                if (is_array($value)) {
                    $this->recursive_array_replace($find, $replace, $data[$key]);
                } else {
                    // have to check if it's string to ensure no switching to string for booleans/numbers/nulls - don't need any nasty conversions
                    if (is_string($value)) $data[$key] = str_replace($find, $replace, $value);
                }
            }
        } else {
            if (is_string($data)) $data = str_replace($find, $replace, $data);
        }

        
    }

    /**
     * Replace all occurrences of the search string with the replacement string.
     *
     * @author Sean Murphy <sean@iamseanmurphy.com>
     * @copyright Copyright 2012 Sean Murphy. All rights reserved.
     * @license http://creativecommons.org/publicdomain/zero/1.0/
     * @link http://php.net/manual/function.str-replace.php
     *
     * @param mixed $search
     * @param mixed $replace
     * @param mixed $subject
     * @param int $count
     * @return mixed
     */
    public static function mb_str_replace( $search, $replace, $subject, &$count = 0 ) {
        if ( ! is_array( $subject ) ) {
            // Normalize $search and $replace so they are both arrays of the same length
            $searches = is_array( $search ) ? array_values( $search ) : array( $search );
            $replacements = is_array( $replace ) ? array_values( $replace ) : array( $replace );
            $replacements = array_pad( $replacements, count( $searches ), '' );

            foreach ( $searches as $key => $search ) {
                $parts = mb_split( preg_quote( $search ), $subject );
                $count += count( $parts ) - 1;
                $subject = implode( $replacements[ $key ], $parts );
            }
        } else {
            // Call mb_str_replace for each subject in array, recursively
            foreach ( $subject as $key => $value ) {
                $subject[ $key ] = self::mb_str_replace( $search, $replace, $value, $count );
            }
        }

        return $subject;
    } 

    /**
     * Wrapper for regex/non regex search & replace
     *
     * @param string $search
     * @param string $replace
     * @param string $string
     * @param int $count
     *
     * @return string
     */
    public function str_replace( $search, $replace, $string, &$count = 0 ) {
        if( function_exists( 'mb_split' ) ) {
            return self::mb_str_replace( $search, $replace, $string, $count );
        } else {
            return str_replace( $search, $replace, $string, $count );
        }
    }

    /**
     * Take a serialised array and unserialise it replacing elements as needed and
     * unserialising any subordinate arrays and performing the replace on those too.
     *
     * @param string $from       String we're looking to replace.
     * @param string $to         What we want it to be replaced with
     * @param array  $data       Used to pass any subordinate arrays back to in.
     * @param bool   $serialised Does the array passed via $data need serialising.
     *
     * @return array    The original array with all elements replaced as needed.
     */
    public function recursive_unserialize_replace( $from = '', $to = '', $data = '', $serialised = false ) {

        // some unserialised data cannot be re-serialised eg. SimpleXMLElements
        try {

           
            if ( is_string( $data ) && ( $unserialized = @unserialize( $data ) ) !== false ) {
                $data = $this->recursive_unserialize_replace( $from, $to, $unserialized, true );
            }

            elseif ( is_array( $data ) ) {
                $_tmp = array( );
                foreach ( $data as $key => $value ) {
                    $_tmp[ $key ] = $this->recursive_unserialize_replace( $from, $to, $value, false );
                }

                $data = $_tmp;
                unset( $_tmp );
            }

            // Submitted by Tina Matter
            elseif ( is_object( $data ) ) {
                // $data_class = get_class( $data );
                $_tmp = $data; // new $data_class( );
                $props = get_object_vars( $data );
                foreach ( $props as $key => $value ) {
                    $_tmp->$key = $this->recursive_unserialize_replace( $from, $to, $value, false );
                }

                $data = $_tmp;
                unset( $_tmp );
            }

            else {
                if ( is_string( $data ) ) {
                    $data = $this->str_replace( $from, $to, $data );

                }
            }

            if ( $serialised )
                return serialize( $data );

        } catch( Exception $error ) {

            $this->add_error( $error->getMessage(), 'results' );

        }

        return $data;
    }

}
