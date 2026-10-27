import unittest

from support import run_solution


class FullNameTest(unittest.TestCase):
    def test_case_01_gurava_guravaiah(self):
        """Gurava Guravaiah."""
        result = run_solution('full-name', 'Gurava\nGuravaiah\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Gurava Guravaiah\n')

    def test_case_02_k_guravaiah(self):
        """K Guravaiah."""
        result = run_solution('full-name', 'K\nGuravaiah\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'K Guravaiah\n')

    def test_edge_01_two_empty_lines(self):
        """Two empty lines."""
        result = run_solution('full-name', '\n\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, ' \n')

    def test_edge_02_unicode_names(self):
        """Unicode names."""
        result = run_solution('full-name', 'గురు\nవయ్య\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'గురు వయ్య\n')


if __name__ == "__main__":
    unittest.main()
