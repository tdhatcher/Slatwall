<?xml version="1.0" encoding="UTF-8"?>
<validateThis xsi:noNamespaceSchemaLocation="validateThis.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<objectProperties>
		<property name="minWeight">
			<rule type="numeric" contexts="*" />
		</property>
		<property name="maxWeight">
			<rule type="numeric" contexts="*" />
		</property>
		<property name="minPrice">
			<rule type="numeric" contexts="*" />
		</property>
		<property name="maxPrice">
			<rule type="numeric" contexts="*" />
		</property>
		<property name="shippingRate">
			<rule type="required" contexts="*" />
			<rule type="numeric" contexts="*" />
		</property>
	</objectProperties>
</validateThis>