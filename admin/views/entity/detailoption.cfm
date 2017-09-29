<!---

    Slatwall - An Open Source eCommerce Platform
    Copyright (C) ten24, LLC
	
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
	
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
	
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
    Linking this program statically or dynamically with other modules is
    making a combined work based on this program.  Thus, the terms and
    conditions of the GNU General Public License cover the whole
    combination.
	
    As a special exception, the copyright holders of this program give you
    permission to combine this program with independent modules and your 
    custom code, regardless of the license terms of these independent
    modules, and to copy and distribute the resulting program under terms 
    of your choice, provided that you follow these specific guidelines: 

	- You also meet the terms and conditions of the license of each 
	  independent module 
	- You must not alter the default display of the Slatwall name or logo from  
	  any part of the application 
	- Your custom code must not alter or create any files inside Slatwall, 
	  except in the following directories:
		/integrationServices/

	You may copy and distribute the modified version of this program that meets 
	the above guidelines as a combined work under the terms of GPL for this program, 
	provided that you include the source code of that other code when and as the 
	GNU GPL requires distribution of source code.
    
    If you modify this program, you may extend this exception to your version 
    of the program, but you are not obligated to do so.

Notes:

--->
<cfimport prefix="swa" taglib="../../../tags" />
<cfimport prefix="hb" taglib="../../../org/Hibachi/HibachiTags" />


<cfparam name="rc.option" type="any" />
<cfparam name="rc.optiongroup" type="any" default="#rc.option.getOptionGroup()#" />
<cfparam name="rc.edit" default="false" />

<cfoutput>
	<hb:HibachiEntityDetailForm object="#rc.option#" edit="#rc.edit#" saveActionQueryString="optionGroupID=#rc.optionGroup.getOptionGroupID()#">
		<hb:HibachiEntityActionBar type="detail" object="#rc.option#" edit="#rc.edit#" 
					backAction="admin:entity.detailoptiongroup" 
					backQueryString="optionGroupID=#rc.optionGroup.getOptionGroupID()#"
					cancelAction="admin:entity.detailoptiongroup"
					cancelQueryString="optionGroupID=#rc.optionGroup.getOptionGroupID()#"
					deleteQueryString="redirectAction=admin:entity.detailoptiongroup&optionGroupID=#rc.optionGroup.getOptionGroupID()#" >
			<hb:HibachiProcessCaller entity="#rc.option#" action="admin:entity.processoption" processContext="removeFromAll" type="list" confirm="true" hideDisabled="false" confirmtext="#$.slatwall.rbKey('admin.entity.processoption.removeFromAll_confirm')#" />
		</hb:HibachiEntityActionBar>
		
		<input type="hidden" name="optionGroup.optionGroupID" value="#rc.optionGroup.getOptionGroupID()#" />

		<hb:HibachiEntityDetailGroup object="#rc.option#">
			<hb:HibachiEntityDetailItem view="admin:entity/optiontabs/basic" open="true" text="#$.slatwall.rbKey('admin.define.basic')#" showOnCreateFlag=true />
			<!--- Images --->
			<swa:SlatwallAdminTabImages object="#rc.option#" />
		</hb:HibachiEntityDetailGroup>
		
	</hb:HibachiEntityDetailForm>

</cfoutput>
