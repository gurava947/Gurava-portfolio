import unittest

from support import run_solution


class PrintTheInput5Test(unittest.TestCase):
    def test_case_01_plain_word(self):
        """plain word."""
        result = run_solution('print-the-input-5', 'Hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hello\n')

    def test_case_02_dotted_word(self):
        """dotted word."""
        result = run_solution('print-the-input-5', 'Practice.folio\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Practice.folio\n')


if __name__ == "__main__":
    unittest.main()
