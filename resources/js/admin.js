$(function ()
{
	// select active link in menu
	(function ()
	{
		var currentPage = window.location.href;
		currentPage = currentPage.replace(window.location.search, '');
		currentPage = currentPage.replace(/\/create$/, '');
		currentPage = currentPage.replace(/\/([0-9]+)\/edit/, '');

		var currentPageLink = $('#side-menu a[href="' + currentPage + '"]');
		currentPageLink.addClass('active').parents('li').addClass('active').end().parents('ul').addClass('collapse').addClass('in');
	})();

	// initialize datatables
	(function ()
	{
		var container = $('#dataTable');
		var order = [];
		var columns = [];
		container.find('th').each(function (i)
		{
			var column = {};
			column.orderable = $(this).data('sortable');
			if (column.orderable == undefined)
			{
				column.orderable = true;
			}
			// disable search in last column
			var searchable = $(this).data('searchable');
			if (searchable === undefined)
			{
				searchable = true;
			}
			if (searchable === false)
			{
				searchable = false;
			}
			column.orderable = column.orderable && !$(this).is(':last-child');
			column.searchable = searchable && !$(this).is(':last-child');

			if ($(this).data('sortable-default'))
			{
				order.push([i, 'asc']);
			}
			columns.push(column);
		});
		var params = {
			language: window.admin.lang.table,
			stateSave: true,
			lengthMenu: [
				[10, 25, 50, -1],
				[10, 25, 50, window.admin.lang.table.all]
			],
			ordering: container.data('ordering'),
			columns: columns
		};
		if (order.length > 0)
		{
			params.order = order;
		}
		var ajax;
		if (ajax = container.data('ajax'))
		{
			params.serverSide = true;
			params.processing = true;
			params.ajax = {
				"url": ajax,
				"data": function (d)
				{
					d.datatable_request = 'true';
				}
			};
		}
		container.dataTable(params);
	})();

	// make delete notifications
	(function ()
	{
		$('.btn-delete').click(function (e)
		{
			e.preventDefault();
			var form = $(this).closest('form');
			bootbox.confirm(window.admin.lang.table['delete-confirm'], function (result)
			{
				if (result)
				{
					form.submit();
				}
			});
		});
	})();

	// create tooltips
	(function ()
	{
		$('html').tooltip({
			selector: "[data-toggle=tooltip]",
			container: "body"
		})
	})();

	// init multiselect plugin
	(function ()
	{
		$('.multiselect').multiselect({
			nonSelectedText: window.admin.lang.select.nothing,
			nSelectedText: window.admin.lang.select.selected
		});
	})();

	// init lightboxes
	(function ()
	{
		$(document).delegate('*[data-toggle="lightbox"]', 'click', function (e)
		{
			e.preventDefault();
			$(this).ekkoLightbox({
				always_show_close: false
			});
		});
	})();

	// autofocus first text input
	(function ()
	{
		$('input[type="text"]:first').focus();
	})();

	// set bootbox locale
	(function ()
	{
		bootbox.setDefaults('locale', window.admin.locale);
	})();

	// datepickers
	(function ()
	{
		$('.datepicker').datetimepicker({
			language: window.admin.locale,
			icons: {
				time: "fa fa-clock-o",
				date: "fa fa-calendar",
				up: "fa fa-arrow-up",
				down: "fa fa-arrow-down"
			}
		}).trigger('dp.change');
	})();
});